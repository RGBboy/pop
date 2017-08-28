module Main exposing (..)

import AnimationFrame
import Html as H exposing (Html)
import Html.Attributes as A
import Html.Events as E
import Pop
import Task exposing (Task)
import Time exposing (Time)



-- MODEL

type State
  = Loading
  | Title
  | Countdown Time
  | Play Pop.Model
  | Replay

type alias Model =
  { lastTick : Maybe Time
  , state : State
  }

init : (Model, Cmd Msg)
init =
  ( { lastTick = Nothing, state = Loading }
  , Task.perform identity (Task.succeed (UpdateState Title))
  )

initCountdown : State
initCountdown = Countdown (3 * Time.second)

initPlay : State
initPlay = Play Pop.init



-- UPDATE

type Msg
  = UpdateState State
  | Tick Time

update : Msg -> Model -> (Model, Cmd Msg)
update message model =
  case message of
    UpdateState state ->
      ( { model | state = state }
      , Cmd.none
      )
    Tick time ->
      case model.state of
        Countdown timeLeft ->
          let
            delta = Maybe.map ((-) time) model.lastTick
              |> Maybe.withDefault 0
            countdown = timeLeft - delta
            newState =
              if countdown > 0 then
                Countdown countdown
              else
                initPlay
          in
            ( { model | lastTick = Just time, state = newState }
            , Cmd.none
            )
        Play pop ->
          let
            delta = Maybe.map ((-) time) model.lastTick
              |> Maybe.withDefault 0
            (newPop, command) = Pop.update (UpdateState Replay) (Pop.Tick time delta) pop
          in
            ( { model | lastTick = Just time, state = Play newPop }
            , command
            )
        _ -> (model, Cmd.none)



-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  AnimationFrame.times Tick



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
      case model.state of
        Loading -> loading
        Title -> title
        Countdown timeLeft -> countdown timeLeft
        Play pop -> Pop.view pop
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
