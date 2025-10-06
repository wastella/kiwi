# kiwi
kiwi

*Completed for the Will "It Rain On My Parade?" challenge at NASA Space Apps Challenge  2025.*

To complete this project, there was two layers we had to complete. The first was the data prediction models, and the second was front end of the website.

Data Prediction Models
For the data prediction models, we ended up using a LightGBM model (https://en.wikipedia.org/wiki/LightGBM). We were considering using the following models before, but ended up using LightGBM because it was the most accurate and fastest model:
- Linear Regression
- Random Forest
- Gradient Boosting
The main challenge we faced with the backend prediction, was the sheer size of data. Because of sizing limitations, we had to limit the data to only the ohio area. Additionally, we decided to sample a subset of the data to make the model faster and more accurate while keeping inside the time boundaries for the hackathon. The dataset we used was from Earthdata (https://ursa.earthdata.nasa.gov/)! It provides a large amount of weather data for the entire earth.

Front End of the Website
For the front end of the website, we used a combination of HTML, CSS, and JavaScript. We used the following technologies:
- Next.js
- Tailwind CSS
- Python to load the model and make predictions
- Artificial intelligence developer tools