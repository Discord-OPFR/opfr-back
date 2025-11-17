import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/guards/auth.guard';
import { UserNotFoundException } from '../errors/UserNotFound';
import { UsersCooldownService } from './users-cooldown/users-cooldown.service';
import { UsersCrewService } from './users-crew/users-crew.service';
import { UsersDailyReportService } from './users-daily-report/users-daily-report.service';
import { UsersEncyclopediaService } from './users-encyclopedia/users-encyclopedia.service';
import { UsersGamesService } from './users-games/users-games.service';
import { UsersInventoryService } from './users-inventory/users-inventory.service';
import { UsersMetaService } from './users-meta/users-meta.service';
import { UsersOrnamentsService } from './users-ornaments/users-ornaments.service';
import { UserQuestMetaService } from './users-quest-meta/users-quest-meta.service';
import { UsersQuestService } from './users-quest/users-quest.service';
import { UsersRaidService } from './users-raid/users-raid.service';
import { UsersShopService } from './users-shop/users-shop.service';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersInventoryService: UsersInventoryService,
    private readonly usersMetaService: UsersMetaService,
    private readonly userQuestService: UsersQuestService,
    private readonly usersQuestMetaService: UserQuestMetaService,
    private readonly usersCrewService: UsersCrewService,
    private readonly usersEncyclopediaService: UsersEncyclopediaService,
    private readonly usersOrnamentsService: UsersOrnamentsService,
    private readonly usersCooldownService: UsersCooldownService,
    private readonly usersDailyReportService: UsersDailyReportService,
    private readonly usersGamesService: UsersGamesService,
    private readonly usersRaidService: UsersRaidService,
    private readonly usersShopService: UsersShopService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return user;
  }

  @Get(':id/inventory')
  async getInventory(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return this.usersInventoryService.findByUserId(user._id);
  }

  @Get(':id/meta')
  async getMeta(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return this.usersMetaService.findOne(user._id);
  }

  @Get(':id/quest')
  async getQuest(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return this.userQuestService.findOne(user._id);
  }

  @Get(':id/quest-meta')
  async getQuestMeta(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return this.usersQuestMetaService.findOne(user._id);
  }

  @Get(':id/crew')
  async getCrew(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return this.usersCrewService.findOne(user._id);
  }

  @Get(':id/encyclopedia')
  async getEncyclopedia(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return this.usersEncyclopediaService.findOne(user._id);
  }

  @Get(':id/ornaments')
  async getOrnaments(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return this.usersOrnamentsService.findOne(user._id);
  }

  @Get(':id/cooldown')
  async getCooldown(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return this.usersCooldownService.findOne(user._id);
  }

  @Get(':id/daily-report')
  async getDailyReport(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return this.usersDailyReportService.findOne(user._id);
  }

  @Get(':id/games')
  async getGames(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return this.usersGamesService.findOne(user._id);
  }

  @Get(':id/raid')
  async getRaid(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return this.usersRaidService.findOne(user._id);
  }

  @Get(':id/shop')
  async getShop(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new UserNotFoundException();

    return this.usersShopService.findOne(user._id);
  }
}
