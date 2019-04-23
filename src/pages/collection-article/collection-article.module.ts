import { SectionHeaderComponentModule } from './../../components/section-header/section-header.module';
import { FactCardComponentModule } from './../../components/fact-card/fact-card.module';
import { ArticleCardComponentModule } from '../../components/article-card/article-card.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionArticlePage } from './collection-article';
import { MianHeaderComponentModule } from '../../components/mian-header/mian-header.module';

@NgModule({
  declarations: [
    CollectionArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionArticlePage),
    ArticleCardComponentModule,
    MianHeaderComponentModule,
    FactCardComponentModule,
    SectionHeaderComponentModule
  ],
})
export class CollectionArticlePageModule {}
