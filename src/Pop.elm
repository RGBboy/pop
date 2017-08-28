module Pop exposing (..)

import Collage as Collage
import Color exposing (Color)
import Element exposing (Element)
import Html as H exposing (Html)
import Html.Attributes as A
import Task
import Time exposing (Time)



-- MODEL

type alias Bubble =
  { radius : Float
  , x : Float
  , y : Float
  , speed : Float
  , color : Color
  }

initBubble : Bubble
initBubble =
  { radius = 30
  , x = 160
  , y = -30
  , speed = 0.5
  , color = Color.white
  }

type alias Model =
  { countdown : Time
  , bubbles : List Bubble
  , score : Int
  , input : Maybe (Float, Float)
  }

init : Model
init =
  { countdown = 3 * Time.second
  , bubbles = [ initBubble ]
  , score = 0
  , input = Nothing
  }



-- UPDATE

type Msg
  = Tick Time Time
  | UpdateInput (Float, Float)

updateBubble : Time -> Time -> Bubble -> Bubble
updateBubble time delta bubble =
  let
    x = bubble.x + (sin ((pi * time / 1000) + (bubble.speed * 3)))
    newY = bubble.y + (bubble.speed * 100 + 50) * delta / 1000
    y =
      if (newY > height + 2 * bubble.radius) then
        0 - 2 * bubble.radius
      else
        newY
  in
    { bubble | x = x, y = y }


update : msg -> Msg -> Model -> (Model, Cmd msg)
update msg message model =
  case message of
    Tick time delta ->
      let
        countdown = model.countdown - delta
        command =
          if countdown > 0 then
            Cmd.none
          else
            Task.perform identity (Task.succeed msg)
      in
        ( { model
          | countdown = countdown
          , bubbles = List.map (updateBubble time delta) model.bubbles
          }
        , command
        )
    UpdateInput input ->
      ( { model | input = Just input }
      , Cmd.none
      )



-- VIEW

width : Float
width = 320

height : Float
height = 480

bubbleView : Bubble -> Collage.Form
bubbleView bubble =
  Collage.filled (bubble.color) (Collage.circle bubble.radius)
    |> Collage.move (bubble.x, bubble.y)
    |> Collage.move (-width / 2, -height / 2)

view : Model -> Html msg
view model =
  let
    time = model.countdown / 1000 |> ceiling |> toString
    game =
      model.bubbles
        |> List.map bubbleView
        |> Collage.collage (round width) (round height)
        |> Element.toHtml
  in
    H.div [ A.class "Play" ]
      [ H.h3 [ A.class "Play-time u-textCenter" ] [ H.text time ]
      , H.h3 [ A.class "Play-score u-textCenter" ] [ H.text (toString model.score) ]
      , game
      ]
