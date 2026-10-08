'''
Question:
Rotate the Array by left n times using Reverse Algorithm / Rotate Array Left by d steps.

URL: https://www.geeksforgeeks.org/problems/rotate-array-by-n-elements-1587115621/1
'''

class Solution:
    # Function to rotate an array by d elements in counter-clockwise direction.
    def rotateArr(self, arr, d):
        n = len(arr)
        d = d % n
        
        # Helper function to reverse array in range [left, right]
        def reverse(left, right):
            while left < right:
                arr[left], arr[right] = arr[right], arr[left]
                left += 1
                right -= 1
                
        # Reversing algorithm:
        # Step 1: Reverse first d elements
        reverse(0, d - 1)
        # Step 2: Reverse remaining n-d elements
        reverse(d, n - 1)
        # Step 3: Reverse the whole array
        reverse(0, n - 1)
        
        return arr
