'''
Question:
Reverse the Student ID
A college stores a student's ID as a string. Reverse the ID without changing the characters.

Input Format
A single string S

Output Format
Print the reversed string.

Constraints
1 ≤ |S| ≤ 100

Sample Test Cases
TC    Input    Output
1     12345    54321
2     ABC123   321CBA
3     A        A
'''

def ReverseStudentID():
    ID = input("Enter your student ID : ")
    return ID[::-1]

print(ReverseStudentID())
