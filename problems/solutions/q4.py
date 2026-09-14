def uniqueEmpID():
    listOfEmpIDs = list(map(int, input("Enter the Employee IDs : ").split()))
    return ("YES" if len(listOfEmpIDs) == len(set(listOfEmpIDs)) else "NO")

print(uniqueEmpID())