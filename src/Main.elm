module Main exposing (..)

import AnimationFrame
import Html as H exposing (Html)
import Html.Attributes as A
import Html.Events as E
import Html.Keyed as K
import Time exposing (Time)



-- MODEL

type View
  = Loading
  | Title
  | Countdown Time
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

initCountdown : View
initCountdown = Countdown (3 * Time.second)



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
        Countdown timeleft ->
          let
            time = timeleft - delta
            view =
              if time > 0 then
                Countdown time
              else
                Play
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
    , buttonGroup [ button (UpdateView Title) "Next" ]
    ]

title : Html Msg
title =
  H.div [ A.class "Title" ]
    [ H.h1 [ A.class "u-textCenter" ] [ H.text "Pop!" ]
    , buttonGroup [ button (UpdateView initCountdown) "Play" ]
    ]

countdown : Time -> Html Msg
countdown timeLeft =
  let
    time = timeLeft / 1000 |> ceiling |> toString
  in
    H.div [ A.class "Countdown" ]
      [ H.h2 [ A.class "u-textCenter" ] [ H.text "Get ready!" ]
      , H.h3 [ A.class "Countdown-time u-textCenter" ] [ H.text time ]
      ]

play : Int -> Int -> Html Msg
play timeLeft score =
  H.div [ A.class "Play" ]
    [ H.h3 [ A.class "Play-time u-textCenter" ] [ H.text (toString timeLeft) ]
    , H.h3 [ A.class "Play-score u-textCenter" ] [ H.text (toString score) ]
    , buttonGroup [ button (UpdateView Replay) "Next" ]
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
