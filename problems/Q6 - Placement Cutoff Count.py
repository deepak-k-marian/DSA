'''
Problem: Placement Cutoff Count
A placement test is conducted for N candidates. Each candidate receives a score. A company has set a minimum cutoff score of C.
Your task is to count how many candidates scored at least C.
Note: A score exactly equal to C is also considered qualified.

Input Format
    • The first line contains two integers N and C. 
    • The second line contains N integers representing the candidates' scores. 

Output Format
Print a single integer representing the number of candidates who scored at least C.

Constraints
    • 1 ≤ N ≤ 10⁵ 
    • 0 ≤ score, C ≤ 100 
    • N scores will be provided. 

Sample Test Case 1
Input
6 60
45 72 61 58 90 60
Output
4
Explanation: Scores 72, 61, 90, 60 are at least 60.

Sample Test Case 2
Input
5 75
80 65 74 90 55
Output
2
Explanation: Scores 80 and 90 are at least 75.

Sample Test Case 3
Input
8 50
50 40 75 30 50 90 49 51
Output
5
Explanation: Scores 50, 75, 50, 90, 51 are at least 50.
'''

def cutoff():
    numOfInputs, Cscore = map(int, input().split())
    scores = list(map(int, input().split()))
    if len(scores) != numOfInputs:
        return "Number of inputs does not match the specified count."
    elif Cscore < 0 or Cscore > 100:
        return "Cutoff score must be between 0 and 100."
    elif any(score < 0 or score > 100 for score in scores):
        return "All scores must be between 0 and 100."
    elif (type(numOfInputs) is not int) or (type(Cscore) is not int):
        return "Inputs must be integers."
    scores = list(filter(lambda score: score >= Cscore, scores))
    return len(scores)

print(cutoff())
