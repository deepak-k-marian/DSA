'''
Question:
Print All Pairs
Given N elements, print every possible ordered pair (Ai, Aj) where i < j.

Input Format
N
A1 A2 ... AN

Output Format
Print each pair on a separate line.

Constraints
2 ≤ N ≤ 100

Sample Test Cases
TC    Input      Output
1     3
      1 2 3      (1,2)
                 (1,3)
                 (2,3)
2     2
      5 10       (5,10)
3     4
      1 2 3 4    (1,2)
                 (1,3)
                 (1,4)
                 (2,3)
                 (2,4)
                 (3,4)
'''

def printAllPairs():
    try:
        numLength = int(input())
        arr = list(map(int, input().split()))
    except ValueError:
        return "Invalid Input Data type"
    for i in range(0, numLength):
        for j in arr[i+1:]:
            print(f"({arr[i]},{j})")

printAllPairs()
