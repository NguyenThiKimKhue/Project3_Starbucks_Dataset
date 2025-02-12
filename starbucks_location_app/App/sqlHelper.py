from sqlalchemy import create_engine, text

import pandas as pd

# Define the SQLHelper Class
# PURPOSE: Deal with all of the database logic

class SQLHelper():

    # Initialize PARAMETERS/VARIABLES

    #################################################
    # Database Setup
    #################################################
     
     def __init__(self):
        self.engine = create_engine("sqlite:///starbucks_store_locations.sqlite")

    #########################################
     
     def queryBarData(self):
          # Create our session (link) from Python to the DB
          conn = self.engine.connect() # Raw SQL/Pandas

          # Define Query
          query = text("""SELECT
                    state_province,
                    COUNT (store_number) AS store_count
               FROM
                    starbucks_store_locations
               WHERE
                    country = 'US'
               GROUP BY
                    state_province
               ORDER BY
                    state_province ASC;""")
          df = pd.read_sql(query, con=conn)
          # Close the connection
          conn.close()
          return(df)
    
     def queryTableData(self):
          # Create our session (link) from Python to the DB
          conn = self.engine.connect() # Raw SQL/Pandas

          # Define Query
          query = text("""SELECT 
                    store_number,
                    country,
                    longitude,
                    latitude
               FROM 
                    starbucks_store_locations 
               GROUP BY 
                    state_province
               ORDER BY 
                    state_province  ASC;""")
          df= pd.read_sql(query, con=conn)
          # Close the connection
          conn.close()
          return(df)
        
        
     def queryMapData(self):
          # Create our session (link) from Python to the DB
          conn = self.engine.connect() # Raw SQL/Pandas

          # Define Query
          query = text("""SELECT
                    region,
                    country,
                    COUNT(store_number) AS store_count
               FROM
                    starbucks_store_locations
               GROUP BY
                    region
               ORDER BY
                    country ASC;""")
          df = pd.read_sql(query, con=conn)
          # Close the connection
          conn.close()
          return(df)

    
