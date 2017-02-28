; AutoIt startup script for the Sportsology Run Projection computer.
; The compiled .exe of this script gets placed in the
; startup programs folder. When the computer boots,
; this script launches the Resolume projection application,
; and sets up the projection display.

; Wait a half minute for the computer to get fully set up
Sleep(30000)

; Open Resolume
; It will oen in full screen
ShellExecute("C:\Users\smm\Documents\sports-run\arena\Run.avc")

; Resolume can startup in an odd projection state sometimes.
; It seems to be fixed by disabling and then enabling
; the projection display. So we simulate that manual
; process here to ensure that the systems always starts up
; correctly each morning.

; Wait 15 seconds for Resolume to fully open
Sleep(15000)

; Disable the full screen projection
Send("#{TAB}")
Sleep(2000)
MouseClick("left", 1457, 500)
Sleep(2000)
Send("^D")

; Wait 5 seconds for the display windows to close
Sleep(5000)

; Enable the advanced display again
WinActivate("Resolume Arena - Run (7104 x 1080)")
Sleep(2000)
Send("^A")

; Wait 2 seconds for the display to appear
Sleep(2000)

; Click the Save and Close button on the Advanced window.
MouseClick("left", 1457, 947)

; Hide the mouse cursor
; Resolume will hide the mouse cursor if we move it,
; once the Advanced display is up.
MouseMove(0,0)

; The fullscreen Advanced display should now be up and ready