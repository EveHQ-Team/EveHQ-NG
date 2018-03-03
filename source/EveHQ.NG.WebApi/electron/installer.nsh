!macro customInstall
  DetailPrint "Register eveauth-evehq-ng URI Handler"
  DeleteRegKey HKCR "eveauth-evehq-ng"
  WriteRegStr HKCR "eveauth-evehq-ng" "" "EveHQ NG SSO authentication Protocol"
  WriteRegStr HKCR "eveauth-evehq-ng" "URL Protocol" ""
  WriteRegBin HKCR "eveauth-evehq-ng" "EditFlags" 00210000
  WriteRegStr HKCR "eveauth-evehq-ng\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
  WriteRegStr HKCR "eveauth-evehq-ng\shell" "" ""
  WriteRegStr HKCR "eveauth-evehq-ng\shell\open" "" ""
  WriteRegStr HKCR "eveauth-evehq-ng\shell\Open\command" "" '"$INSTDIR\${APP_EXECUTABLE_FILENAME}" %1'
!macroend

!macro customUnInstall
  DetailPrint "Remove eveauth-evehq-ng URI Handler"
  DeleteRegKey HKCR "eveauth-evehq-ng"
!macroend
