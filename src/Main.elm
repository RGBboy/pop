module Main exposing (..)

import AnimationFrame
import Html as H exposing (Html)
import Html.Attributes as A
import Html.Events as E
import Html.Keyed as K
import Task exposing (Task)
import Time exposing (Time)



-- MODEL

type View
  = Loading
  | Title
  | Countdown Time
  | Play Time
  | Replay

type alias Model =
  { view : View
  }

init : (Model, Cmd Msg)
init =
  ( { view = Loading
    }
  , Task.perform identity (Task.succeed (UpdateView Title))
  )

initCountdown : View
initCountdown = Countdown (3 * Time.second)

initPlay : View
initPlay = Play (3 * Time.second)



-- UPDATE

type Msg
  = UpdateView View
  | Tick Time

update : Msg -> Model -> (Model, Cmd msg)
update message model =
  case message of
    UpdateView view ->
      ( { model | view = view }
      , Cmd.none
      )
    Tick delta ->
      case model.view of
        Countdown timeLeft ->
          let
            time = timeLeft - delta
            view =
              if time > 0 then
                Countdown time
              else
                initPlay
          in
            ( { model | view = view}
            , Cmd.none
            )
        Play timeLeft ->
          let
            time = timeLeft - delta
            view =
              if time > 0 then
                Play time
              else
                Replay
          in
            ( { model | view = view}
            , Cmd.none
            )
        _ -> (model, Cmd.none)



-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  AnimationFrame.diffs Tick



-- VIEW

viewToString : View -> String
viewToString view =
  case view of
    Loading -> "Loading"
    Title -> "Title"
    Countdown _ -> "Countdown"
    Play _ -> "Play"
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

loading : Html msg
loading =
  H.div [ A.class "Loading" ]
    [ H.h3 [ A.class "u-textCenter" ] [ H.text "Loading..." ]
    ]

title : Html Msg
title =
  H.div [ A.class "Title" ]
    [ H.h1 [ A.class "u-textCenter" ] [ H.text "Pop!" ]
    , buttonGroup [ button (UpdateView initCountdown) "Play" ]
    ]

countdown : Time -> Html msg
countdown timeLeft =
  let
    time = timeLeft / 1000 |> ceiling |> toString
  in
    H.div [ A.class "Countdown" ]
      [ H.h2 [ A.class "u-textCenter" ] [ H.text "Get ready!" ]
      , H.h3 [ A.class "Countdown-time u-textCenter" ] [ H.text time ]
      ]

play : Time -> Int -> Html msg
play timeLeft score =
  let
    time = timeLeft / 1000 |> ceiling |> toString
  in
    H.div [ A.class "Play" ]
      [ H.h3 [ A.class "Play-time u-textCenter" ] [ H.text time ]
      , H.h3 [ A.class "Play-score u-textCenter" ] [ H.text (toString score) ]
      ]

replay : Int -> Html Msg
replay score =
  H.div [ A.class "Replay" ]
    [ H.h2 [ A.class "u-textCenter" ] [ H.text "Time's Up!"]
    , H.p [ A.class "u-textCenter" ] [ H.text ("You scored " ++ (toString score) ++ " points!") ]
    , buttonGroup
        [ button (UpdateView initCountdown) "Replay"
        , button (UpdateView Title) "Menu"
        ]
    ]

viewToHtml : View -> Html Msg
viewToHtml view =
  case view of
    Loading -> loading
    Title -> title
    Countdown timeLeft -> countdown timeLeft
    Play timeLeft -> play timeLeft 5
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
