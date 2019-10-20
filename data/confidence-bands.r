# V and beta supplied via graph.py script

V <- structure(c(3.19826308e-06, -1.28332733e-02,  1.28734322e+01, -1.28332733e-02,  5.14946331e+01, -5.16559253e+04, 1.28734322e+01, -5.16559253e+04,  5.18178740e+07
), .Dim = c(3L, 3L), .Dimnames = list(c("a0", "a1", "a2"), c("a0",
"a1", "a2")))

beta <- c(1.93057366e+05, -1.95738445e+02,  4.96009134e-02)
x <- seq(1993, 2100, by = 1)
X <- cbind(1, x, x ^ 2)
mu <- X %*% beta
# e <- sqrt( rowSums(X * (X %*% V)) )
# n <- 978
# lo <- mu + e * qt(0.025, n - 3)
# up <- mu - e * qt(0.025, n - 3)
# print(qnorm(.99999))

# e <-  1.644*(mu/sqrt(978))
# e <- qnorm(.95) *(mu/sqrt(978))
e <- 10 *(mu/sqrt(978))

lo <- mu + e
up <- mu - e

print(e)
print(n - 3)
print(mu)
print(lo)
print(up)
matplot(x, cbind(mu, lo, up), type = "l", col = 1, lty = c(1,2,2))
# matplot(x, cbind(mu), type = "l", col = 1, lty = c(1,2,2))
