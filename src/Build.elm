port module Build exposing (..)


import Dict exposing (Dict)
import ElmHtml.InternalTypes exposing (decodeElmHtml)
import ElmHtml.ToString exposing (nodeToStringWithOptions, defaultFormatOptions)
import Html as H exposing (Html)
import Json.Decode as Decode
import Json.Encode as Encode exposing (encode)
import Main
import Native.Jsonify
import Tuple



port request : (() -> msg) -> Sub msg
port response : Encode.Value -> Cmd msg



pages : Dict String (Html Main.Msg)
pages =
  Dict.fromList [ ("/", Main.view (Tuple.first Main.init)) ]

asJsonString : Html msg -> String
asJsonString = Native.Jsonify.stringify

options = { defaultFormatOptions | newLines = True, indent = 2 }

htmlToString : Html msg -> String
htmlToString html =
  case Decode.decodeString decodeElmHtml (asJsonString html) of
    Err str -> str
    Ok str -> nodeToStringWithOptions options str

encodePage : a -> Html msg -> Encode.Value
encodePage _ page =
  page
    |> htmlToString
    |> Encode.string

encodedPages : Encode.Value
encodedPages =
  Encode.object (Dict.toList (Dict.map encodePage pages))

main : Program Never () Msg
main =
  Platform.program
    { init = ((), Cmd.none)
    , update = update
    , subscriptions = subscriptions
    }

type Msg = Request

update : Msg -> () -> ((), Cmd msg)
update _ model = (model, response encodedPages)

subscriptions : () -> Sub Msg
subscriptions _ = request (always Request)
