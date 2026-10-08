'''
Question:
Given a attendance marker:
    - 0 represents absent
    - 1 represents present
find the total no of absentees for the given day

I/P:
2
0 1 1 0 0 1 1 0
1 1 1

O/P:
4 student absent out of 8 student
Attendance Percentage : 50%

No absentees
Attendance Percentage 100%
'''

def PresentAbsent():
    totalInput = int(input("Enter the total number of Iteration: "))

    for i in range(totalInput):
        studentAttendace = input("Enter the attendance (0 for absent, 1 for present) : ")
        studentAttendaceArray = []

        for j in studentAttendace:
            if j == " ":
                continue
            else:
                studentAttendaceArray += [j]

        present = absent = 0

        for k in studentAttendaceArray:
            if k == "0":
                absent += 1
            else:
                present += 1

        if absent == 0:
            print("No absent")
            print("Attendance percent: 100%")
        else:
            print(f"{absent} students out of {absent+present} student")
            print(f"Attendance percentage : {round(present/(present+absent) * 100) if present+absent > 0 else 0}%")

PresentAbsent()
