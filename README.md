# Gabrielle Michaud's Personal Site

https://vanlifemedic.com

## Setup

```bash
brew install python3
pip3 install --upgrade pip setuptools virtualenv

git clone https://github.com/pirate/vanlifemedic.com
cd vanlifemedic.com
virtualenv -p $(which python3) venv
source ven/bin/activate
pip install -r requirements.txt
```


## Running the Server

```bash
./server.py
```

Then open http://127.0.0.1:5000