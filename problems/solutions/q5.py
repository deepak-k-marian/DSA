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