class Solution:
    def rearrange(self, arr):
        # p -> positive
        # n -> negative
        p = [x for x in arr if x >= 0]
        n = [x for x in arr if x < 0]

        i = 0
        p_idx, n_idx = 0, 0        # n -> negative



        while p_idx < len(p) and n_idx < len(n):
            if i % 2 == 0:
                arr[i] = p[p_idx]
                p_idx += 1
            else:
                arr[i] = n[n_idx]
                n_idx += 1
            i += 1

        while p_idx < len(p):
            arr[i] = p[p_idx]
            p_idx += 1
            i += 1

        while n_idx < len(n):
            arr[i] = n[n_idx]
            n_idx += 1
            i += 1

        return arr