import sys

def add():
    return sys.argv[1] + sys.argv[2]

print(add())
sys.stdout.flush()
