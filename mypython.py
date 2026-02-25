def create_dict(n):
   d1 = {}
   for i in range(1, n+1):
        d1[i] = i*i
   return d1

d = create_dict(8)
for k,v in d.items():
    print(f"{k}-->{v}")
