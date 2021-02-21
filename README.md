#### ML Lab - Ionio

https://e-class.ionio.gr/courses/NOC122/


**Εργαστήριο CLIPS**

Εγκαταστήστε (αν δεν έχετε ήδη) το [docker](https://www.docker.com/) στο σύστημά σας.  
Κατεβάστε τα αρχεία `Dockerfile` και `setup.sh` σε ένα φάκελό σας (πχ με `git clone https://github.com/riggas-ionio/ml-lab.git` εντός αυτού του φακέλου).  
Εκτελέστε (<ins>στο φάκελο που βρίσκονται τα `Dockerfile` και `setup.sh`</ins>):
* `docker build -t ionio-ml-lab-image .` ώστε να δημιουργήσετε ένα image, όπως περιγράφει το Dockerfile
* `docker run --name ionio-ml-lab -it ionio-ml-lab-image:latest` ώστε να ξεκινήσετε και να _μπείτε_ στο container βασισμένο στο image που μόλις δημιουργήσατε.

Εντός του container θα πρέπει ήδη να είναι λειτουργικά το asciinema και το clips :-)

* **CLIPS Lab#1:** [asciinema](https://asciinema.org/a/392401)
