
import os
import sys
import chromadb
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

client = chromadb.Client()
collection = client.get_or_create_collection("codebase")

def index_folder(folder):
    for root, dirs, files in os.walk(folder):
        for file in files:
            if file.endswith((".py",".js",".ts",".java",".go")):
                path = os.path.join(root,file)
                with open(path,"r",encoding="utf-8",errors="ignore") as f:
                    content=f.read()

                embedding=model.encode(content).tolist()

                collection.add(
                    documents=[content],
                    embeddings=[embedding],
                    ids=[path]
                )
                print("Indexed:",path)

if __name__=="__main__":
    folder=sys.argv[1] if len(sys.argv)>1 else "."
    index_folder(folder)
