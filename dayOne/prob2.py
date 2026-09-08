'''
Given n employee IDs determine wether all IDs are unique;
print YES if every ID occurs once else NO.

Constrains:
- Input will be numeric
'''

def uniqueEmpID():
    listOfEmpIDs = list(map(int, input("Enter the Employee IDs : ").split()))
    print ("YES" if len(listOfEmpIDs) == len(set(listOfSetOfEmpIDs)) else "NO")

uniqueEmpID()