#### ML Lab - Ionio

https://opencourses.ionio.gr/courses/DDI201/


**Εργαστήριο CLIPS**

Εγκαταστήστε (αν δεν έχετε ήδη) το [docker](https://www.docker.com/) στο σύστημά σας.  
Κατεβάστε τα αρχεία `Dockerfile` και `setup.sh` σε ένα φάκελό σας (πχ με `git clone https://github.com/riggas-ionio/ml-lab.git` εντός αυτού του φακέλου).  
Εκτελέστε (<ins>στο φάκελο που βρίσκονται τα `Dockerfile` και `setup.sh`</ins>):
* `docker build -t ionio-ml-lab-image .` ώστε να δημιουργήσετε ένα image, όπως περιγράφει το Dockerfile
* `docker run --name ionio-ml-lab -it ionio-ml-lab-image:latest` ώστε να ξεκινήσετε ένα container βασισμένο στο image που μόλις δημιουργήσατε.
    * Εντός του container εκτελέστε `clips` και θα έχετε στη διάθεσή σας το περιβάλλον:  
    ```
    root@17c719a99e95:/clips# clips
         CLIPS (V6.24 06/15/06)
    CLIPS> 
    ```

_Εντός του container είναι λειτουργικά το asciinema και το clips_ :-)

Σε επόμενα εργαστήρια που θα χρειαστείτε να χρησιμοποιήσετε τον ίδιο container:
* `docker start ionio-ml-lab`
* `docker exec -ti ionio-ml-lab bash`
* Και εντός του container: `root@17c719a99e95:/clips# clips`



**Υλοποίηση του διαγνωστικού συστήματος αυτοκινήτου (εργ.1):**
https://asciinema.org/connect/ae4848c9-f706-473a-b89a-14c3ad51d55c  
Η λύση σε [clp αρχείο](Solution_2.clp).  
* **ToDo:** Προσθέστε προτεραιότητες με την εντολή `(declare (salience int))`, όπου int ένας ακέραιος. 
