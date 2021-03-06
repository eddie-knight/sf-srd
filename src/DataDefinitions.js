const DataDefinitions = {
    'Armory': {
        'armor': {
            'table': [
                'name',
                'armor_type',
                'level',
                'price',
                'eac_bonus',
                'kac_bonus',
                'max_dex_bonus',
                'ac_penalty',
                'speed_penalty',
                'upgrade_slots',
                'bulk'
            ],
            'modal': [
                'armor_type',
                'level',
                'price',
                'eac_bonus',
                'kac_bonus',
                'max_dex_bonus',
                'ac_penalty',
                'speed_penalty',
                'upgrade_slots',
                'bulk',
                'description'
            ]
        },
        'powered_armor': {
            'table': [
                'name',
                'level',
                'price',
                'eac_bonus',
                'kac_bonus',
                'max_dex_bonus',
                'weapon_slots',
                'upgrade_slots',
                'land_speed',
                'swim_speed',
                'climb_speed',
                'fly_speed',
                'burrow_speed',
            ],
            'modal': [
                'level',
                'price',
                'eac_bonus',
                'kac_bonus',
                'max_dex_bonus',
                'ac_penalty',
                'Speed',
                'strength',
                'damage',
                'size',
                'reach',
                'capacity',
                'usage',
                'usage_per_hour',
                'weapon_slots',
                'upgrade_slots',
                'bulk',
                'description',
            ],
        },
        'armor_upgrades': {
            'table': [
                'name',
                'level',
                'price',
                'slots',
                'armor_type',
                'bulk',
            ],
            'modal': [
                'level',
                'price',
                'slots',
                'armor_type',
                'bulk',
                'description',
            ],
        },
        'weapons': {
            'table': [
                'name',
                'damage',
                {'weapon_category': ['_hands', 'name',]},
            ],
            'modal': [
                'damage',
                {'weapon_category': ['_hands', 'name',]},
                'description',
            ]
        }, 
        'weapon_fusions': {
            'table': [
                'name',
                'level',
            ],
            'modal': [
                'level',
                'description',
            ],
        },
        'weapon_manufacturers': {
            'table': [
                'name',
                'description',
                'price',
            ],
            'modal': [
                'price',
                'description'
            ],
        },
        'weapon_accessories': {
            'table': [
                'name',
                'level',
                'price',
                'weapon_type',
            ],
            'modal': [
                'level',
                'price',
                'bulk',
                'capacity',
                'usage',
                'weapon_type',
                'description'
            ],
        },
        'ammunition': {
            'table': [
                'name',
                'level',
                'price',
                'capacity',
            ],
            'modal': [
                'level',
                'price',
                'capacity',
                'bulk',
                'special',
                'description',
            ],
        },
        'solarian_crystals': {
            'table': [
                'name', 'level', 'price', 'damage', 'critical', 'special',
            ],
            'modal': [
                'level', 'price', 'damage', 'critical', 'special', 'description',
            ],
        }
    },
    'Market': {
        'items': {
            'table': [
                'name',
                'type',
                'level',
                'price',
                'bulk',
                'capacity',
                'usage',
                'hands'
            ],
            'modal': [
                'type',
                'level',
                'price',
                'bulk',
                'capacity',
                'usage',
                'hands',
                'description',
            ]
        },
        'goods_and_services': {
            'table': [
                'name',
                'type',
                'price',
                'bulk'
            ],
            'modal': [
                'type',
                'price',
                'bulk'
            ],
        },
        'poisons': {
            'table': [
                'name',
                'level',
                'price',
                'type',
                'fort_save',
                'track',
                'onset',
                'frequency',
                'cure'
            ],
            'modal': [
                'level',
                'price',
                'type',
                'fort_save',
                'track',
                'onset',
                'frequency',
                'cure',
            ],
        },
        'medicinals': {
            'table': [
                'name',
                'level',
                'price'
            ],
            'modal': [
                'level',
                'price',
            ],
        },
        'drugs': {
            'table': [
                'name',
                'level',
                'price',
                'type',
                'fort_save',
                'addiction',
                'track',
                'effect'
            ],
            'modal': [
                'level',
                'price',
                'type',
                'fort_save',
                'addiction',
                'track',
                'effect',
            ]
        },
        'weapon_materials': {
            'table': [
                'name',
                'description',
                'type',
                'price',
            ],
            'modal': [
                'type',
                'price',
            ]
        },
        'vehicles': {
            'table': [
                'name',
                'level',
                'description',
                'price',
                'type',
                'speed',
                'complement',
                'passengers',
            ],
            'modal': [
                'level',
                'description',
                'price',
                'type',
                'speed',
                'land_speed',
                'hover_speed',
                'fly_speed',
                'swim_speed',
                'climb_speed',
                'burrow_speed',
                'complement',
                'passengers',
            ],
        },
    },
    'Character': {
        'spells': {
            'table': [
                'name',
                'description',
                'mystic_level',
                'technomancer_level',
                'witchwarper_level',
                {'effect_range': ['name', '_sort_value',]},
            ],
            'modal': [
                'mystic_level',
                'technomancer_level',
                'witchwarper_level',
                {'effect_range': ['name',]},
                'school',
                'casting_time',
                'effect',
                'area',
                'targets',
                'duration',
                'saving_throw',
                'spell_resistance',
                'description',
            ],
        },
        'skills': {
            'table': [
                'name',
                {'ability': ['name',]},
                'untrained',
                'ac_penalty',
                'envoy',
                'mechanic',
                'mystic',
                'operative',
                'solarian',
                'soldier',
                'technomancer',
                'biohacker',
                'vanguard',
                'witchwarper'
            ],
            'modal': [
                {'ability': ['name',]},
                'untrained',
                'ac_penalty',
                'envoy',
                'mechanic',
                'mystic',
                'operative',
                'solarian',
                'soldier',
                'technomancer',
                'biohacker',
                'vanguard',
                'witchwarper'
            ],
        },
        'classes': {
            'table': [
                'key_ability_score',
                'hit_points',
                'stamina_points',
                'skills_per_level',
                'description',
            ],
            'modal': [
                'hit_points',
                'stamina_points',
                'key_ability_score',
                'skills_per_level',
                {'class_proficiencies': ['name']},
                'long_description'
            ],
            'modalTabs': {
                'class_features': [
                    'name',
                    'alternate',
                    'description',
                    {'class_special_skills': ['name', 'description',]}
                ]
            }
        },
        'feats': {
            'table': [
                'name',
                'prerequisities',
                'description',
                'combat'
            ],
            'modal': [
                'prerequisities',
                'long_description',
                'combat'
            ]
        },
        'augmentations': {
            'table': [
                'name',
                'level',
                'type',
                'system',
                'price',
            ],
            'modal': [
                'type',
                'level',
                'price',
                'system',
                'description',
            ],
        }
    }
}
export default DataDefinitions
