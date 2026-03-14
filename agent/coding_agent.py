
import chromadb
from sentence_transformers import SentenceTransformer
import requests

model = SentenceTransformer("all-MiniLM-L6-v2")

client = chromadb.Client()
collection = client.get_or_create_collection("codebase")

def generate_code(query):

    results = collection.query(
        query_embeddings=[model.encode(query).tolist()],
        n_results=3
    )

    context="\n".join(sum(results["documents"],[]))

    prompt=f"""
Use the following project code context:

{context}

User request:
{query}

Generate the best possible code.
"""

    r=requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model":"deepseek-coder",
            "prompt":prompt,
            "stream":False
        }
    )

    return r.json()["response"]
