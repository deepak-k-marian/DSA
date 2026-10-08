'''
Question:
First and Last Occurrence
Given an array and a target value X, find the first and last position where X occurs.
Positions are 0-based.
If the target does not occur, print -1 -1.

Input Format
N X
A1 A2 ... AN

Output Format
first_position last_position

Constraints
1 ≤ N ≤ 1000
-10^5 ≤ Ai, X ≤ 10^5

Sample Test Cases
TC   Input            Output
1    6 5
     2 5 3 5 7 5      1 5
2    5 10
     10 20 30 40 50   0 0
3    5 10
     20 30 40 50 60  -1 -1
'''

def firstAndLastOccur():
    arrSize, targetEle = map(int, input().split())
    arr = list(map(int, input().split()))

    if arrSize == 0:
        return -1, -1

    if arrSize == 1:
        if arr[0] == targetEle:
            return 0, 0
        else:
            return -1, -1

    if len(arr) != arrSize:
        return "Invalid Input - Array Size Mismatch"

    p1 = 0
    p2 = len(arr) - 1
    p1TarPos = p2TarPos = -1

    while p1 <= p2:
        if arr[p1] == targetEle:
            p1TarPos = p1
        else:
            p1 += 1

        if arr[p2] == targetEle:
            p2TarPos = p2
        else:
            p2 -= 1

        if p1TarPos != -1 and p2TarPos != -1:
            break

    return p1TarPos, p2TarPos


print(firstAndLastOccur())

'''
Also this is valid for smaller ones:

def firstAndLastOccur():
    n, t = map(int, input().split())	
    arr = list(map(int, input().split()))
    if len(arr) != n:
        return "Invalid Input - Array Size Mismatch"
    try:
        return arr.index(t), n - 1 - arr[::-1].index(t)
    except ValueError:
        return -1, -1

print(firstAndLastOccur())
'''
