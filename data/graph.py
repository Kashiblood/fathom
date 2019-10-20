import plotly.express as px
import pandas as pd
import numpy as np
import plotly.graph_objects as go

df = pd.read_excel('data.xlsx')
x = df['date']
y = df['variation']

npX = np.array(x)
npY = np.array(y)
print(len(npX), len(npY))
result = np.polyfit(npX, npY, 2, cov=True)
print(result)
V = result[0]

# beta = np.array([0.2135187, 1.1343072, -1.0000000])
# x = np.array(range(1993, 2101))
# X = cbind(1, x, x ** 2)
# X = np.hstack(1, x, x**2)
# mu = X % * % beta
# e = sqrt(rowSums(X * (X % * % V)))
# n = 978
# lo = mu + e * qt(0.025, n - 3)
# up = mu - e * qt(0.025, n - 3)


# matplot(x, cbind(mu, lo, up), type = "l", col = 1, lty = c(1,2,2))

# fig = px.scatter(x=x, y=y, trendline="ols")
# fig.update_xaxes(range=[x[0], 2100])
# fig.update_yaxes(range=[y[0], 400])
# fig.show()
