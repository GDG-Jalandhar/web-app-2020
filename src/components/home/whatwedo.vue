<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" md="3" lg="3" sm="12">
                <p class="google-font mb-0" style="font-size:150%">What we do?</p>
                <p class="google-font mt-0" style="font-size:95%">Google Developer Groups (GDGs) are for developers who are interested in Google's developer technology.</p>
                <p class="google-font" style="font-size:95%">About different Google technologies</p>
                <span v-for="(item,i) in communitydata.WhatWeDoTech" :key="i">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }" >
                            <a :href="item.link" target="_blank" class="ma-0">
                                <img :src="getImgUrl(item.image)" width="30vh" alt="" srcset="" dark v-on="on">
                            </a> 
                            &nbsp;&nbsp;&nbsp;
                        </template>
                        <span>{{item.TechName}}</span>
                    </v-tooltip>
                </span>
                
                <br>

                <v-btn href="#" outlined target="_blank" rounded small style="text-transform: capitalize;border-radius:5px;text-transform: capitalize;" class="ml-0 mt-3 google-font hidden-md-and-down">Learn More</v-btn>

            </v-col>
            <v-col cols="12" md="9" lg="9" sm="12" >
               <v-container fluid>
                   <v-row>
                       <v-col md="3" lg="3" sm="6" cols="6" class="text-center pa-2">
                            <v-icon large style="font-size:300%">mdi-comment</v-icon>
                            <p class="google-font mt-2" style="font-size:130%">Talks</p>
                            <p class="google-font" style="font-size:95%">Get updated with the latest news and announcements</p>
                       </v-col>
                       <v-col md="3" lg="3" sm="6" cols="6" class="text-center pa-2">
                            <v-icon large style="font-size:300%">mdi-code-tags</v-icon>
                            <p class="google-font mt-2" style="font-size:130%">Codelabs</p>
                            <p class="google-font" style="font-size:95%">Get hands-on experience and guidance from the community members</p>
                       </v-col>
                       <v-col md="3" lg="3" sm="6" cols="6" class="text-center pa-2">
                            <v-icon large style="font-size:300%">mdi-school</v-icon>
                            <p class="google-font mt-2" style="font-size:130%">Campus Roadshows</p>
                            <p class="google-font" style="font-size:95%">Share knowledge in different Companies, colleges and universities</p>
                       </v-col>
                       <v-col md="3" lg="3" sm="6" cols="6" class="text-center pa-2">
                            <v-icon large style="font-size:300%">mdi-chart-bubble</v-icon>
                            <p class="google-font mt-2" style="font-size:130%">Live Viewing Parties</p>
                            <p class="google-font" style="font-size:95%">Share knowledge in different Companies, colleges and universities</p>
                       </v-col>
                   </v-row>
               </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import communitydata from '@/assets/data/communitydata.json'
    export default {
        name: 'App',
        data: () => ({
            communitydata: communitydata
        }),
        methods:{
            getImgUrl(url) {
                if(url.length>0){
                    return require('@/assets/img/what-we-do/'+url)
                }else{
                    return require('@/assets/img/what-we-do/notFound.png')
                }
            },
        }
};
</script>