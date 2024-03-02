import { Router, Request, Response } from 'express';
const router = Router();
import Resource from '../models/resourceModel';

// get all the resources object from database
router.get('/all', async (req: Request, res: Response) => {
    try {
        const resourceAll = await Resource.find();
        if (!resourceAll) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        res.json(resourceAll);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error2' });
    }
});

// get all the resources title matches part of the user input
router.get('/search', async (req: Request, res: Response) => {
    try {
      const { title } = req.query as { title?: string };
      if (!title) {
        return res.status(400).json({ message: 'Title query parameter is required.' });
      }
      const resourceSearchResult = await Resource.find({ title: { $regex: title, $options: 'i'  } });

      res.json(resourceSearchResult);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// get resources by _id
router.get('/:id', async (req, res) => {
    try {
        const resourceByID = await Resource.findOne({ _id: req.params.id });
        if (!resourceByID) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        res.json(resourceByID);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error1' });
    }
});


export default router;
