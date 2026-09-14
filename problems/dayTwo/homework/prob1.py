'''
Question:
Create a 1-D array to store a set of exam scores. Write a program to perform the following operations:
    1. Display the scores in rows of four scores per row. 
    2. Calculate and display the average score. 
    3. Find and display the lowest score. 
    4. Find and display the highest score. 
    5. Calculate the deviation of each score from the average and display the score along with its deviation. 
    6. Calculate and display the standard deviation. 
    7. Count and display how many scores are within one standard deviation of the average. 

Formula
Average:
Average = Sum of scores / Number of scores
Deviation:
Deviation = Score − Average
Population Standard Deviation:
SD = √[Σ(Score − Average)² / N]
A score is within one standard deviation if:
Average − SD ≤ Score ≤ Average + SD

Sample Test Case 1
Input
8
70 80 90 60 75 85 95 65
Output
Scores:
70 80 90 60
75 85 95 65

Average: 77.50
Lowest Score: 60
Highest Score: 95

Score  Deviation
70     -7.50
80      2.50
90     12.50
60    -17.50
75     -2.50
85      7.50
95     17.50
65    -12.50

Standard Deviation: 11.46

Scores within one standard deviation: 6

Sample Test Case 2
Input
8
50 55 60 65 70 75 80 85
Output
Scores:
50 55 60 65
70 75 80 85

Average: 67.50
Lowest Score: 50
Highest Score: 85

Score  Deviation
50    -17.50
55    -12.50
60     -7.50
65     -2.50
70      2.50
75      7.50
80     12.50
85     17.50

Standard Deviation: 11.46

Scores within one standard deviation: 6

Sample Test Case 3
This test case includes identical scores, which is useful for checking the student's handling of standard deviation = 0.
Input
8
80 80 80 80 80 80 80 80
Output
Scores:
80 80 80 80
80 80 80 80

Average: 80.00
Lowest Score: 80
Highest Score: 80

Score  Deviation
80      0.00
80      0.00
80      0.00
80      0.00
80      0.00
80      0.00
80      0.00
80      0.00

Standard Deviation: 0.00

Scores within one standard deviation: 8
'''

def examScore():
    try:
        numOfInput = int(input())
        if numOfInput <= 0:
            print("Number must be positive\n")
            examScore()
            return
        
        scores = list(map(int, input().split()))
        
        if len(scores) != numOfInput:
            print("Number of scores doesn't match input count")
            examScore()
            return
        
        # Calculate average
        avg = sum(scores) / len(scores)
        
        # Display scores in rows of 4
        print("\nScores:")
        [print(*scores[i:i+4]) for i in range(0, len(scores), 4)]
        
        # Display average
        print(f"\nAverage: {avg:.2f}")
        
        # Display lowest and highest
        print(f"Lowest Score: {min(scores)}")
        print(f"Highest Score: {max(scores)}")
        
        # Display score with deviation
        print("\nScore  Deviation")
        deviations = []
        for score in scores:
            deviation = score - avg
            deviations.append(deviation)
            print(f"{score:<5} {deviation:>7.2f}")
        
        # Calculate standard deviation
        variance = sum(d**2 for d in deviations) / len(scores)
        std_dev = variance ** 0.5
        print(f"\nStandard Deviation: {std_dev:.2f}")
        
        # Count scores within one standard deviation
        lower_bound = avg - std_dev
        upper_bound = avg + std_dev
        count_within_sd = sum(1 for score in scores if lower_bound <= score <= upper_bound)
        print(f"\nScores within one standard deviation: {count_within_sd}")
        
    except ValueError:
        print("Invalid input! Please enter valid integers.")
        examScore()

examScore()