import { Router } from 'express-router';
import notesManager from '../../data/fs/NotesManager.js';

const notesRouter = Router()

notesRouter.get("/", async (req, res, next) => {
    try {
        const notes = await notesManager.read()
        return res, render("notes", { notes })
    } catch (error) {
        return next(error)
    }
})
notesRouter.get("/:nid", async (req, res, next) => {
    try {
        const { nid } = req.params;
        const one = await notesManager.readOne(nid);
        return res.render("products", { note: one });
    } catch (error) {
        return next(error)
    }
})

export default notesRouter