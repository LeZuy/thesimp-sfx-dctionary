import pandas as pd

def count_null(df):
    missing_rows = df[df.isnull().any(axis=1)]
    print(missing_rows)

if __name__ == "__main__":
    df = pd.read_csv("sfx_jaded_full.csv")
    count_null(df)