import csv
import tkinter as tk
from tkinter import ttk


with open("csv/airports.csv", newline = "", encoding = "utf-8") as file:
    airports = list(csv.DictReader(file))

def findAirport(entry: str):
    entry = entry.lower().strip()

    results = []

    for airport in airports:
        if(entry in airport["iata_code"].lower() or entry in airport["name"].lower() or 
           entry in airport["municipality"].lower() or entry in airport["iso_country"].lower()) and airport["iata_code"] != "":
            results.append([airport["iata_code"],airport["municipality"],airport["name"], airport["iso_country"]])

    return results

