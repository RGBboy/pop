module Main exposing (..)

import AnimationFrame
import Html as H exposing (Html)
import Html.Attributes as A
import Html.Events as E
import Task exposing (Task)
import Time exposing (Time)



-- MODEL

type Model
  = Loading
  | Title
  | Countdown Time
  | Play Time
  | Replay

init : (Model, Cmd Msg)
init =
  ( Loading
  , Task.perform identity (Task.succeed (UpdateState Title))
  )

initCountdown : Model
initCountdown = Countdown (3 * Time.second)

initPlay : Model
initPlay = Play (3 * Time.second)



-- UPDATE

type Msg
  = UpdateState Model
  | Tick Time

update : Msg -> Model -> (Model, Cmd msg)
update message model =
  case message of
    UpdateState model ->
      ( model
      , Cmd.none
      )
    Tick delta ->
      case model of
        Countdown timeLeft ->
          let
            time = timeLeft - delta
            newModel =
              if time > 0 then
                Countdown time
              else
                initPlay
          in
            ( newModel
            , Cmd.none
            )
        Play timeLeft ->
          let
            time = timeLeft - delta
            newModel =
              if time > 0 then
                Play time
              else
                Replay
          in
            ( newModel
            , Cmd.none
            )
        _ -> (model, Cmd.none)



-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  AnimationFrame.diffs Tick



-- VIEW

app : Html msg -> Html msg
app children =
  H.div [ A.id "App", A.class "App u-posAbsoluteCenter"]
    [ H.div [ A.class "App-screen Arrange Arrange--middle"]
      [ H.div [ A.class "Arrange-sizeFill"] [ children ]
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
    , buttonGroup [ button (UpdateState initCountdown) "Play" ]
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
        [ button (UpdateState initCountdown) "Replay"
        , button (UpdateState Title) "Menu"
        ]
    ]

view : Model -> Html Msg
view model =
  let
    content =
      case model of
        Loading -> loading
        Title -> title
        Countdown timeLeft -> countdown timeLeft
        Play timeLeft -> play timeLeft 5
        Replay -> replay 5
  in
    app content



-- MAIN

main =
  H.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
