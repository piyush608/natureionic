import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExploreArticlesPage } from './explore-articles';
import { ArticleCardComponentModule } from '../../components/article-card/article-card.module';
import { MianHeaderComponentModule } from '../../components/mian-header/mian-header.module';

@NgModule({
  declarations: [
    ExploreArticlesPage,
  ],
  imports: [
    IonicPageModule.forChild(ExploreArticlesPage),
    ArticleCardComponentModule,
    MianHeaderComponentModule,
  ],
})
export class ExploreArticlesPageModule {}
