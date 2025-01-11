import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { NoteCreateDto } from "./dto";
import { JwtAuthGuard } from "src/authentication/guards";

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }
    
    @Post()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    create(@Body() noteCreateDto: NoteCreateDto) {
        return this.notesService.createNote(noteCreateDto);
    }
}