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

print (cutoff())