from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError
import math
import time

geolocator = Nominatim(user_agent="app.py", timeout=10)  

def geocode_address(address, retries=3):
    for attempt in range(retries):
        try:
            location = geolocator.geocode(address)
            if location:
                return (location.latitude, location.longitude)
            else:
                print(f"Address could not be geocoded: {address}")
                return (None, None)
        except GeocoderTimedOut:
            print(f"Geocoding timed out for address: {address}. Retrying ({attempt + 1}/{retries})...")
            time.sleep(1) 
        except GeocoderServiceError as e:
            print(f"Geocoding service error for address: {address}: {e}")
            break
        except Exception as e:
            print(f"Unexpected error while geocoding address: {address}: {e}")
            break
    return (None, None)

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = math.sin(delta_phi / 2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(delta_lambda / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c
