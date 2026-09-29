# Fixed Size Sliding Window & Substrings

> **Topics covered:** Fixed Window, Variable Window, Substrings, Subsequences, Prefix Sums

---

## What is the Sliding Window?

The **Sliding Window** technique maintains a window (a contiguous range of elements) that slides across the array or string. It avoids recomputing results from scratch by updating the window incrementally.

| Type           | Window Size | Use Case                                |
|----------------|-------------|-----------------------------------------|
| Fixed Size     | Constant $k$| Max/Min/Sum of subarray of size $k$     |
| Variable Size  | Dynamic     | Longest/Shortest subarray meeting condition |

---

## Fixed Size Sliding Window

The window size stays constant at $k$. Slide it one step at a time by adding the new element and removing the leftmost element.

### Template

```python
def fixed_window(nums, k):
    # Initialize window
    window_val = sum(nums[:k])
    result = window_val

    for i in range(k, len(nums)):
        window_val += nums[i]        # add new element
        window_val -= nums[i - k]    # remove element leaving window
        result = max(result, window_val)  # update answer

    return result
```

## Variable Size Sliding Window

The window expands and contracts based on a condition.

### Template

```python
def variable_window(nums, condition):
    left = 0
    result = 0
    window_state = ...  # depends on problem

    for right in range(len(nums)):
        # Expand: include nums[right] in window
        window_state = update(window_state, nums[right])

        # Shrink: while condition violated
        while not valid(window_state):
            window_state = remove(window_state, nums[left])
            left += 1

        # Update result with current valid window
        result = max(result, right - left + 1)

    return result
```

---

## Substrings vs Subsequences

| Feature       | Substring                | Subsequence               |
|---------------|--------------------------|---------------------------|
| Contiguous?   | ✅ Yes                   | ❌ No                    |
| Order matters?| ✅ Yes                   | ✅ Yes                   |
| Example       | `"abc"` in `"xabcy"`     | `"ace"` in `"abcde"`     |
| Window usage? | ✅ Sliding window         | ❌ DP / two pointers      |

---

## Count Distinct Elements in Sliding Window

```python
from collections import defaultdict

def count_distinct(nums, k):
    freq = defaultdict(int)
    result = []

    for i in range(len(nums)):
        freq[nums[i]] += 1
        if i >= k:
            freq[nums[i - k]] -= 1
            if freq[nums[i - k]] == 0:
                del freq[nums[i - k]]
        if i >= k - 1:
            result.append(len(freq))

    return result
```

---

## Move Zeroes (Two Pointer Variation)

```python
def move_zeroes(nums):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1
```

---

## Prefix Sum (Foundation for Sliding Window)

Prefix sums allow range sum queries in $O(1)$ after $O(n)$ preprocessing.

```python
def build_prefix(nums):
    prefix = [0] * (len(nums) + 1)
    for i, n in enumerate(nums):
        prefix[i + 1] = prefix[i] + n
    return prefix

# Range sum [l, r] (0-indexed)
def range_sum(prefix, l, r):
    return prefix[r + 1] - prefix[l]
```

---

## Complexity Summary

| Technique                      | Time    | Space   |
|-------------------------------|---------|---------|
| Fixed sliding window           | $O(n)$  | $O(1)$  |
| Variable sliding window        | $O(n)$  | $O(n)$  |
| Sliding window max (deque)     | $O(n)$  | $O(k)$  |
| Prefix sum build               | $O(n)$  | $O(n)$  |
| Prefix sum query               | $O(1)$  | —       |

---

## LeetCode Problems

| # | Problem | Pattern |
|---|---------|---------|
| 643 | Maximum Average Subarray I | Fixed window |
| 239 | Sliding Window Maximum | Fixed + deque |
| 3 | Longest Substring Without Repeating Characters | Variable window |
| 76 | Minimum Window Substring | Variable window |
| 485 | Max Consecutive Ones | Counting |
| 1004 | Max Consecutive Ones III | Variable window |
| 209 | Minimum Size Subarray Sum | Variable window |
| 2461 | Maximum Sum of Distinct Subarrays With Length K | Fixed + hash set |
| 1343 | Number of Sub-arrays of Size K and Average ≥ Threshold | Fixed window |
