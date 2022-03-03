(defrule call-the-aa (petrol yes)(starter-turning yes) => (printout t "Call the A.A." crlf))
(defrule buy-some-petrol (petrol no)(starter-turning yes) => (printout t "Buy some petrol" crlf))
(defrule replace-starter (terminals-clean yes)(solenoid-click yes)(lights-working yes)(starter-turning no) => (printout t "Replace starter" crlf))
(defrule clean-terminals (terminals-clean no)(solenoid-click yes)(lights-working yes)(starter-turning no) => (printout t "Clean terminals" crlf))
(defrule replace-solenoid (solenoid-fuse-ok yes)(solenoid-click no)(lights-working yes)(starter-turning no) => (printout t "Replace solenoid" crlf))
(defrule replace-fuse (solenoid-fuse-ok no)(solenoid-click no)(lights-working yes)(starter-turning no) => (printout t "Replace solenoid" crlf))
(defrule charge-battery (lights-working no)(starter-turning no) => (printout t "Charge battery" crlf))

(defrule are-lights-working
    (not (lights-working ?))
    =>
    (printout t "Are the car's lights working (yes or no)?")
    (assert (lights-working (read))) )

; Από εδώ και μετά μόνοι τους:

(defrule is-starter-turning
    (not (starter-turning ?))
    =>
    (printout t "Is the car's starter turning (yes or no)?")
    (assert (starter-turning (read))) )

(defrule got-any-petrol
    (not (petrol ?))
    =>
    (printout t "Is there any petrol in the tank (yes or no)?")
    (assert (petrol (read))) )

(defrule does-solenoid-click
    (not (solenoid-click ?))
    =>
    (printout t "Can you hear the solenoid click (yes or no)?")
    (assert (solenoid-click (read))) )

(defrule is-solenoid-fuse-ok
    (not (solenoid-fuse-ok ?))
    =>
    (printout t "Is the solenoid fuse ok (yes or no)?")
    (assert (solenoid-fuse-ok (read))) )

(defrule are-the-terminals-clean
    (not (terminals-clean ?))
    =>
    (printout t "Are the terminals clean (yes or no)?")
    (assert (terminals-clean (read))) )
