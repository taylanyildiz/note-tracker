import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { NoteCreateDto } from "./dto";
import { JwtAuthGuard } from "src/authentication/guards";
import { SearchNoteDto } from "./dto/search-note.dto";
import { Roles } from "src/common/decorators/metadata";
import { UserRole } from "../users/enums";
import { RolesGuard } from "src/common/guards";

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() noteCreateDto: NoteCreateDto) {
        return this.notesService.createNote(noteCreateDto);
    }


    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
        await this.notesService.deleteNote(id);
        return {
            message: 'Note Deleted',
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    get(@Param('id', ParseIntPipe) id: number) {
        return this.notesService.getNote(id);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(@Query() searchNoteDto: SearchNoteDto) {
        return this.notesService.getNotes(searchNoteDto);
    }
}