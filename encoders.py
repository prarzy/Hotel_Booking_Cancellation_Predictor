import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin

class FrequencyEncoder(BaseEstimator, TransformerMixin):
    def __init__(self, columns=None):
        self.freq_maps = {}
        self.columns = columns

    def fit(self, X, y=None):
        if not hasattr(X, 'columns'):
            if self.columns is None:
                raise ValueError("Column names must be provided for array input")
            X = pd.DataFrame(X, columns=self.columns)
        else:
            self.columns = X.columns.tolist()
            
        for col in self.columns:
            self.freq_maps[col] = X[col].value_counts(normalize=True).to_dict()
        return self

    def transform(self, X):
        if not hasattr(X, 'columns'):
            X = pd.DataFrame(X, columns=self.columns)
        X = X.copy()
        for col in self.freq_maps:
            if col in X:
                X[col] = X[col].map(self.freq_maps[col]).fillna(0)
        return X