# Project3_Starbucks Locations App
Interactive Data Application for Analyzing Starbucks Store Locations

Datasets Used:

    1) Starbucks Locations Worldwide 2023: https://www.kaggle.com/datasets/omarsobhy14/starbucks-store-location-2023

    2) Country Mapping - ISO, Continent, Region: https://www.kaggle.com/datasets/andradaolteanu/country-mapping-iso-continent-region
        The Starbucks Locations Worldwide 2023 dataset provided a more updated list of Starbucks store locations, while the Country Mapping dataset allowed us to enhance our analysis by incorporating detailed geographical data, including continents and regions.

Project Overview:
This project was developed as part of a Data Analytics and Visualization Bootcamp. It is a Flask-based web application that provides interactive visualizations and insights into Starbucks' global presence.

    The app allows users to:
    ✅ Explore interactive maps of Starbucks locations.
    ✅ Analyze store distribution trends with dynamic charts.
    ✅ View data dashboards with key statistics.
    ✅ Access API endpoints for structured data retrieval.

⚙️ Technologies Used
The project integrates multiple data science and web development tools, including:

    Python (Flask, Pandas, SQLite)
    HTML, CSS, Bootstrap (Frontend UI)
    JavaScript (D3.js, Leaflet.js) (Interactive Visualizations)
    SQLite (Database Management)
    Jupyter Notebook (Data Cleaning & Preprocessing)

API Endpoints:
Our Flask backend exposes the following API routes for accessing Starbucks data:

    Endpoint	Description
    /api/v1.0/bar_data/<country>	Returns Starbucks store count by country.
    /api/v1.0/table_data	Provides structured data for analysis.
    /api/v1.0/burst_data	Retrieves burst analysis data.
    /api/v1.0/map_data	Returns location coordinates for mapping.


Key Features:
    1. Interactive Map
    Users can explore Starbucks locations worldwide on a dynamic map powered by Leaflet.js.
    Includes filtering options by region, country, and city.

    2. Data Dashboard
    Visualizes key business insights using  bar charts, Sunburst, interactive maps, and tables.
    Shows store distribution trends, density analysis, and market expansion potential.

