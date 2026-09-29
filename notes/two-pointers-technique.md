# Two Pointers Technique

> **Topics covered:** Opposite Direction, Same Direction, Floyd's Cycle, Array Merging

---

## What is Two Pointers?

Two Pointers is a technique where **two indices** traverse a data structure — either from opposite ends or in the same direction — to solve problems more efficiently than nested loops.

| Approach     | Time Complexity | vs. Brute Force |
|--------------|-----------------|-----------------|
| Two Pointers | $O(n)$          | $O(n^2)$        |

---

## Pattern 1 — Opposite Direction (Left & Right)

Pointers start at both ends and move toward each other.

**Use cases:** Sorted array pair sum, palindrome check, squaring a sorted array.

```python
left, right = 0, len(nums) - 1
while left < right:
    s = nums[left] + nums[right]
    if s == target:
        # found
        break
    elif s < target:
        left += 1
    else:
        right -= 1
```

### Palindrome Check

```python
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
```

---

## Pattern 2 — Same Direction (Fast & Slow)

Both pointers move forward, usually at different speeds or with different conditions.

**Use cases:** Remove duplicates in-place, partition arrays, Floyd's cycle detection.

```python
slow = 0
for fast in range(1, len(nums)):
    if nums[fast] != nums[slow]:
        slow += 1
        nums[slow] = nums[fast]
# first slow+1 elements are the deduplicated result
```

---

## Pattern 3 — Floyd's Cycle Detection

Uses a **slow** pointer (1 step) and a **fast** pointer (2 steps). If they ever meet, a cycle exists.

```python
slow, fast = head, head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast:
        return True  # cycle detected
return False
```

---

## Pattern 4 — Two Pointers in Separate Arrays (Merge)

One pointer per array, advance the one with the smaller current value.

```python
i, j = 0, 0
result = []
while i < len(a) and j < len(b):
    if a[i] <= b[j]:
        result.append(a[i]); i += 1
    else:
        result.append(b[j]); j += 1
result.extend(a[i:])
result.extend(b[j:])
```

---

## Array Comparison — Common Elements

Sort both arrays, then walk with two pointers to find intersections.

```python
a.sort(); b.sort()
i, j = 0, 0
common = []
while i < len(a) and j < len(b):
    if a[i] == b[j]:
        common.append(a[i]); i += 1; j += 1
    elif a[i] < b[j]:
        i += 1
    else:
        j += 1
```

---

## Complexity Summary

| Pattern            | Time      | Space     |
|--------------------|-----------|-----------|
| Opposite direction | $O(n)$    | $O(1)$    |
| Same direction     | $O(n)$    | $O(1)$    |
| Floyd's cycle      | $O(n)$    | $O(1)$    |
| Merge two arrays   | $O(n+m)$  | $O(n+m)$  |

---

## LeetCode Problems

| # | Problem | Pattern |
|---|---------|---------|
| 1 | Two Sum | Hash map |
| 167 | Two Sum II (Input Sorted) | Opposite direction |
| 15 | 3Sum | Two pointers + sort |
| 18 | 4Sum | Two pointers + nested |
| 141 | Linked List Cycle | Floyd's cycle |
| 26 | Remove Duplicates from Sorted Array | Same direction |
| 977 | Squares of a Sorted Array | Opposite direction |
