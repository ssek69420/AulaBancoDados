const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();

app.use(cors());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let collection;

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('musicasdb');
    collection = db.collection('musicas');

  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

connectDB();

app.use(express.json()); 


app.post('/musicas', async (req, res) => {
  try {
    const novaMatricula = req.body;

    result = await collection.insertOne(novaMatricula)
    
    res.status(201).json({ message: 'Música criada com sucesso', matriculaId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar Música', error: err });
  }
});

app.get('/musicas', async (req, res) => {
  try {
    const musicas = await collection.find().toArray();

    res.status(200).json(musicas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar Músicas', error: err });
  }
});

const { ObjectId } = require('mongodb');

app.get('/musicas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);
    const matricula = await collection.findOne({_id: newId})

    if (!matricula) {
      res.status(404).json({ message: 'Música não encontrada' });
    } else {
      res.status(200).json(matricula);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar Música', error: err });
  }
});

app.put('/musicas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);
    const atualizacao = req.body;
    const result = await collection.updateOne( { _id: newId }, { $set: atualizacao })
    

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Música não encontrada' });
    } else {
      res.status(200).json({ message: 'Música atualizada com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar Música', error: err });
  }
});

app.delete('/musicas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);
    const result = await collection.deleteOne({_id: newId})


    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Música não encontrada' });
    } else {
      res.status(200).json({ message: 'Música excluída com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir Música', error: err });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
