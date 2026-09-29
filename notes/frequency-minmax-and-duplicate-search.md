# Frequency, Min/Max Tracking & Duplicate Search

> **Topics covered:** Array Patterns, Hashing (applied), Occurrence Search, First/Last Position

---

## Frequency Tracking

Frequency tracking finds how often each element appears in an array or string.

```python
# Using a dict
freq = {}
for n in nums:
    freq[n] = freq.get(n, 0) + 1

# Using Counter
from collections import Counter
freq = Counter(nums)
freq.most_common(1)   # most frequent element
```

---

## Finding First & Last Occurrence

Find the **first** or **last** position of a target element in an array.

```python
def first_occurrence(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

def last_occurrence(arr, target):
    result = -1
    for i, val in enumerate(arr):
        if val == target:
            result = i
    return result
```

> For sorted arrays, use **binary search** → $O(\log n)$.

---

## Min/Max Tracking

Track the running minimum or maximum as you iterate.

```python
min_val = float('inf')
max_val = float('-inf')

for n in nums:
    min_val = min(min_val, n)
    max_val = max(max_val, n)
```

### Running Max — Seen So Far Pattern

After each element, record the maximum value seen up to that point.

```python
current_max = float('-inf')
for val in measurements:
    current_max = max(current_max, val)
    # current_max holds the max seen so far
```

### Running Max − Running Min (Spread)

```python
running_min = float('inf')
running_max = float('-inf')
for val in measurements:
    running_min = min(running_min, val)
    running_max = max(running_max, val)
    spread = running_max - running_min
```

---

## Duplicate Search

### Check if Any Duplicate Exists

```python
def contains_duplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False
```

### Find the First Duplicate

```python
def first_duplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return n
        seen.add(n)
    return -1
```

### Find All Duplicates

```python
def find_duplicates(nums):
    freq = {}
    for n in nums:
        freq[n] = freq.get(n, 0) + 1
    return [k for k, v in freq.items() if v > 1]
```

---

## Unique & Non-Repeating Elements

```python
# Elements that appear exactly once
from collections import Counter
freq = Counter(nums)

unique = [k for k, v in freq.items() if v == 1]
sum_unique = sum(k for k, v in freq.items() if v == 1)

# First non-repeating character in a string
def first_non_repeating(s):
    freq = Counter(s)
    for ch in s:
        if freq[ch] == 1:
            return ch
    return ""
```

---

## Complexity Summary

| Operation              | Time   | Space  |
|------------------------|--------|--------|
| Frequency count        | $O(n)$ | $O(n)$ |
| Find first occurrence  | $O(n)$ | $O(1)$ |
| Find last occurrence   | $O(n)$ | $O(1)$ |
| Running min/max        | $O(n)$ | $O(1)$ |
| Contains duplicate     | $O(n)$ | $O(n)$ |
| Find all duplicates    | $O(n)$ | $O(n)$ |

---

## LeetCode Problems

| # | Problem | Pattern |
|---|---------|---------|
| 219 | Contains Duplicate II | Hash map + index |
| 2956 | Find Common Elements Between Two Arrays | Set intersection |
| 387 | First Unique Character in a String | Frequency + scan |
| 121 | Best Time to Buy and Sell Stock | Running min/max |
| 442 | Find All Duplicates in an Array | Frequency map |
| 1748 | Sum of Unique Elements | Frequency filter |
