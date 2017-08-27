module Main exposing (..)

import Html as H exposing (Html)
import Html.Attributes as A
import Html.Events as E
import Html.Keyed as K



-- MODEL

type View
  = Loading
  | Title
  | Countdown
  | Play
  | Replay

type alias Model =
  { view : View
  }

init : (Model, Cmd msg)
init =
  ( { view = Loading
    }
  , Cmd.none
  )



-- UPDATE

type alias Msg
  = View

update : Msg -> Model -> (Model, Cmd msg)
update view model =
  ( { model | view = view }
  , Cmd.none
  )



-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none




-- VIEW

viewToString : View -> String
viewToString view =
  case view of
    Loading -> "Loading"
    Title -> "Title"
    Countdown -> "Countdown"
    Play -> "Play"
    Replay -> "Replay"

app : View -> List (Html msg) -> Html msg
app view children =
  H.div [ A.id "App", A.class "App u-posAbsoluteCenter"]
    [ H.div [] -- transition group App-animation
        [ K.node "div" []
            [ ( viewToString view,
                H.div [ A.class "App-screen Arrange Arrange--middle"]
                  [ H.div [ A.class "Arrange-sizeFill"] children
                  ]
              )
            ]
        ]
    ]

button : msg -> String -> Html msg
button onClick text =
  H.button [ A.class "Button Button--default", E.onClick onClick ] [ H.text text ]

buttonGroup : List (Html msg) -> Html msg
buttonGroup buttons =
  List.intersperse (H.text " ") buttons
    |> H.div [ A.class "u-textCenter" ]

loading : Html Msg
loading =
  H.div [ A.class "Loading" ]
    [ H.h3 [ A.class "u-textCenter" ] [ H.text "Loading..." ]
    , buttonGroup [ button Title "Next" ]
    ]

title : Html Msg
title =
  H.div [ A.class "Title" ]
    [ H.h1 [ A.class "u-textCenter" ] [ H.text "Pop!" ]
    , buttonGroup [ button Countdown "Play" ]
    ]

countdown : Int -> Html Msg
countdown timeLeft =
  H.div [ A.class "Countdown" ]
    [ H.h2 [ A.class "u-textCenter" ] [ H.text "Get ready!" ]
    , H.h3 [ A.class "Countdown-time u-textCenter" ] [ H.text (toString timeLeft) ]
    , buttonGroup [ button Play "Next" ]
    ]

play : Int -> Int -> Html Msg
play timeLeft score =
  H.div [ A.class "Play" ]
    [ H.h3 [ A.class "Play-time u-textCenter" ] [ H.text (toString timeLeft) ]
    , H.h3 [ A.class "Play-score u-textCenter" ] [ H.text (toString score) ]
    , buttonGroup [ button Replay "Next" ]
    ]

replay : Int -> Html Msg
replay score =
  H.div [ A.class "Replay" ]
    [ H.h2 [ A.class "u-textCenter" ] [ H.text "Time's Up!"]
    , H.p [ A.class "u-textCenter" ] [ H.text ("You scored " ++ (toString score) ++ " points!") ]
    , buttonGroup
        [ button Countdown "Replay"
        , button Title "Menu"
        ]
    ]

viewToHtml : View -> Html Msg
viewToHtml view =
  case view of
    Loading -> loading
    Title -> title
    Countdown -> countdown 5
    Play -> play 10 5
    Replay -> replay 5

view : Model -> Html Msg
view model =
  app model.view [(viewToHtml model.view)]



-- MAIN

main =
  H.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
