import { BookmarkComponentModule } from './../../components/bookmark/bookmark.module';
import { PostCardComponentModule } from './../../components/post-card/post-card.module';
import { SearchbarComponentModule } from './../../components/searchbar/searchbar.module';
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { HomePage } from "./home";
import { BusinessCardComponentModule } from "../../components/business-card/business-card.module";
import { RecipeCardComponentModule } from '../../components/recipe-card/recipe-card.module';
import { ProductCardComponentModule } from '../../components/product-card/product-card.module'
import { SectionHeaderComponentModule } from '../../components/section-header/section-header.module';
import { ArticleCardComponentModule } from '../../components/article-card/article-card.module';
import { FactCardComponentModule } from '../../components/fact-card/fact-card.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    BusinessCardComponentModule,
    RecipeCardComponentModule,
    ProductCardComponentModule,
    SearchbarComponentModule,
    SectionHeaderComponentModule,
    PostCardComponentModule,
    BookmarkComponentModule,
    ArticleCardComponentModule,
    FactCardComponentModule
  ],
})
export class HomePageModule {}
