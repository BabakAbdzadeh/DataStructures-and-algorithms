def kara_multip(x,y):

    # base case
    if len(str(x))==1 or len(str(y))==1:
        return x*y

    else:
        n = max(len(str(x)), len(str(y)))
        n_half = n//2

        a = x//(10**n_half)
        b = x % (10**n_half)
        c = y//(10**n_half)
        d = y%(10**n_half)


    # recursive
        ac = kara_multip(a,c)
        bd = kara_multip(b,d)
        ad_plus_bc = kara_multip(a+b, c+d) -ac -bd

        product = 10**(2*n_half)*ac +10**(n_half)*(ad_plus_bc) + bd
        return product
# sample numbers
x = 10908090
y = 88989893

print(kara_multip(x,y))
