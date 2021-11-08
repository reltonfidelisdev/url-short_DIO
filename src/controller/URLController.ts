import { config } from '../config/Constants';
import { Request,  Response } from "express";
import shortId from 'shortid';
import { URLModel } from '../database/model/URL';

export class URLcontroller {

    public async shorten(req: Request, res: Response): Promise<void> {

        // Pegar a url enviada pelo usuário
        const { originURL } = req.body

        // validar se a URL já existe no MongoDB
        const url = await URLModel.findOne({ originURL })
        if(url) {
            res.json(url)
            return
        }

        // Gerar um hash para a url
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        // Salvar o hash e a url no MongoDB
        const newUrl = await URLModel.create({ hash, shortURL, originURL })
        // Devolver o que foi salvo no MongoDB
        res.json({ newUrl })
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        // Pegar o hash da url
        const { hash } = req.params
        // procurar url
        const urlEcxist = await URLModel.findOne({ hash })
        if (urlEcxist){
            res.redirect(urlEcxist.originURL)
            return
        }
        res.status(400).json({ error: 'Url not found'})
          
    }

}