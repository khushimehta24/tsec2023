import pandas as pd
import joblib
import os

def prepare_X(test_dataframe):
    test_dataframe.drop(test_dataframe[test_dataframe["floor"] == "3"].index, axis = 0, inplace=True)
    test_dataframe.drop(test_dataframe[test_dataframe["floor"] == "1"].index, axis = 0, inplace=True)
    test_dataframe.drop(test_dataframe[test_dataframe["floor"] == "Ground"].index, axis = 0, inplace=True)
    test_dataframe["renting_floor"] = [x.split(" out of ")[0] for x in test_dataframe["floor"].values]
    test_dataframe["total_floor"] = [x.split(" out of ")[1] for x in test_dataframe["floor"].values]
    test_dataframe.loc[test_dataframe["renting_floor"] == "Ground", "renting_floor"] = "0"
    test_dataframe.loc[test_dataframe["renting_floor"] == "Upper Basement", "renting_floor"]= "-1"
    test_dataframe.loc[test_dataframe["renting_floor"] == "Lower Basement", "renting_floor"] = "-2"
    test_dataframe["renting_Floor"] = test_dataframe["renting_floor"].astype(int)
    test_dataframe["total_floor"] = test_dataframe["total_floor"].astype(int)
    test_dataframe.drop(axis = 1, labels="floor", inplace=True)
    test_dataframe["posted_month"] = [x.split("-")[1] for x in test_dataframe["posted_on"].values]
    test_dataframe["posted_date"] = [x.split("-")[2] for x in test_dataframe["posted_on"].values]
    test_dataframe["posted_month"] = test_dataframe["posted_month"].astype(int)
    test_dataframe["posted_date"] = test_dataframe["posted_date"].astype(int)
    test_dataframe.drop(axis = 1, labels="posted_on", inplace=True)
    test_dataframe.drop(axis = 1, labels = "area_location", inplace = True)
    X_test = test_dataframe.loc[:, ['bhk', 'size', 'area_type', 'city', 'furnishing_status',
           'tenant_preferred', 'bathroom', 'point_of_contact', 'renting_floor',
           'total_floor', 'posted_month', 'posted_date']]
    return X_test  

def model_predict(data):
    keys = []
    values = []
    for key, value in data.items():
        keys.append(key)
        values.append([value])

    df = pd.DataFrame(dict(zip(keys, values)))
    columntrans1 = joblib.load(os.getcwd()+'\\backend\\ml\\custom_transformer.joblib')
    A1 = prepare_X(df)
    A1 = columntrans1.transform(A1)
    loaded_rf = joblib.load(os.getcwd()+"\\backend\\ml\\my_random_forest.joblib")
    preds=loaded_rf.predict(A1)
    return preds